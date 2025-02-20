export interface Book {
    offer_id: number;
    cover_book: string;
    title: string;
    author?: string;
    username?: string;
    frontImage: string;
    backImage: string;
    smallfrontImage?: string;
    smallbackImage?: string;
    price?: string;
    total_pages?: string
  }
