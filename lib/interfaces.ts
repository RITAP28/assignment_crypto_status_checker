export interface ICoinsProps {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    price_change_percentage_24h: number;
    total_volume: number;
}

export interface ICoinDataProps {
    id: string;
    symbol: string;
    name: string;
    categories: string[];
    description: { en: string };
    links: {
        homepage: string[];
        blockchain_site: string[];
        official_forum_url: string[];
    };
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    country_origin: string;
    genesis_date: Date;
    market_cap_rank: number;
    market_data: {
        current_price: {
            usd: number;
        },
        total_value_locked: number;
        mcap_to_tvl_ratio: number;
        roi: number;
        ath: {
            usd: number;
        };
        ath_change_percentage: {
            usd: number;
        };
        total_volume: {
            usd: number;
        };
        high_24h: {
            usd: number;
        };
        low_24h: {
            usd: number;
        };
        price_change_24h: number;
        price_change_percentage_24h: number;
        price_change_percentage_7d: number;
        price_change_percentage_14d: number;
        price_change_percentage_30d: number;
        price_change_percentage_60d: number;
        price_change_percentage_200d: number;
        price_change_percentage_1y: number;
        price_change_24h_in_currency: {
            usd: number;
        };
        market_cap_change_24h: number;
        market_cap_change_percentage_24h: number;
        price_change_percentage_1h_in_currency: {
            usd: number;
        };
        price_change_percentage_24h_in_currency: {
            usd: number;
        };
        price_change_percentage_7d_in_currency: {
            usd: number;
        };
        price_change_percentage_14d_in_currency: {
            usd: number;
        };
        price_change_percentage_30d_in_currency: {
            usd: number;
        };
        price_change_percentage_60d_in_currency: {
            usd: number;
        };
        price_change_percentage_200d_in_currency: {
            usd: number;
        };
        price_change_percentage_1y_in_currency: {
            usd: number;
        };
        market_cap_change_24h_in_currency: {
            usd: number;
        };
        market_cap_change_percentage_24h_in_currency: {
            usd: number;
        };
        total_supply: number;
        max_supply: number;
        circulating_supply: number;
    }
}

export interface IMarketDataProps {
    current_price: {
            usd: number;
        },
        total_value_locked: number;
        mcap_to_tvl_ratio: number;
        roi: number;
        ath: {
            usd: number;
        };
        ath_change_percentage: {
            usd: number;
        };
        total_volume: {
            usd: number;
        };
        high_24h: {
            usd: number;
        };
        low_24h: {
            usd: number;
        };
        price_change_24h: number;
        price_change_percentage_24h: number;
        price_change_percentage_7d: number;
        price_change_percentage_14d: number;
        price_change_percentage_30d: number;
        price_change_percentage_60d: number;
        price_change_percentage_200d: number;
        price_change_percentage_1y: number;
        price_change_24h_in_currency: {
            usd: number;
        };
        market_cap_change_24h: number;
        market_cap_change_percentage_24h: number;
        price_change_percentage_1h_in_currency: {
            usd: number;
        };
        price_change_percentage_24h_in_currency: {
            usd: number;
        };
        price_change_percentage_7d_in_currency: {
            usd: number;
        };
        price_change_percentage_14d_in_currency: {
            usd: number;
        };
        price_change_percentage_30d_in_currency: {
            usd: number;
        };
        price_change_percentage_60d_in_currency: {
            usd: number;
        };
        price_change_percentage_200d_in_currency: {
            usd: number;
        };
        price_change_percentage_1y_in_currency: {
            usd: number;
        };
        market_cap_change_24h_in_currency: {
            usd: number;
        };
        market_cap_change_percentage_24h_in_currency: {
            usd: number;
        };
        total_supply: number;
        max_supply: number;
        circulating_supply: number;
}