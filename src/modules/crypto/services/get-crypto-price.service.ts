import axios from 'axios';
import { Currency } from '../../../constants';
import { BadRequestError } from '../../../errors';
import redisClient from '../../../redis-client';

type GetCryptoPriceInput = {
  currency: Currency;
};

export class GetCryptoPriceService {
  private apiEndpoint: string;

  constructor() {
    this.apiEndpoint = 'https://www.mercadobitcoin.net/api/:currency/ticker';
  }

  async execute({ currency }: GetCryptoPriceInput): Promise<{ buy: number; sell: number }> {
    if (![Currency.BTC].includes(currency)) {
      throw new BadRequestError(`"${currency}" is not a valid crypto currency`);
    }

    const cacheKey = `quote:${currency}`;

    const apiEndpoint = this.apiEndpoint.replace(':currency', currency);

    const cachedQuote = await redisClient.get(cacheKey);

    if (cachedQuote) {
      return JSON.parse(cachedQuote);
    }

    const { ticker } = await axios.get(apiEndpoint).then((response) => response.data);

    if (!ticker) {
      throw new Error('Error fetching quote from external API');
    }

    const { buy, sell } = ticker;

    const quote = {
      buy: this.convertReaisPerBitcoinToCentavosPerSatoshi(buy),
      sell: this.convertReaisPerBitcoinToCentavosPerSatoshi(sell),
    };

    await redisClient.set(cacheKey, JSON.stringify(quote), {
      EX: 60 * 10, // 10 minutes
    });

    return quote;
  }

  private convertReaisPerBitcoinToCentavosPerSatoshi(reaisPerBitcoin: number) {
    const reaisPerSatoshi = reaisPerBitcoin / 100000000;

    return reaisPerSatoshi * 100;
  }
}
