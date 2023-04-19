import React from "react";

export {};

declare global {
  interface Breed {
    id: string;
    name: string;
  }

  interface Cat {
    id: string;
    url: string;
    width: number;
    height: number;
  }

  interface CatInfo extends Cat {
    breeds: [
      {
        id: string;
        name: string;
        origin: string;
        temperament: string;
        description: string;
      }
    ];
  }
}
