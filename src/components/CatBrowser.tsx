import React from "react";

import Container from "react-bootstrap/Container";

import Breeds from "../helpers/getBreeds";
import Cats from "../helpers/getCats";
import Cat from "../helpers/getCat";

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
  breeds: {
    name: string;
    origin: string;
    temperament: string;
    description: string;
  };
}

const breeds: Breed[] = await Breeds();

export default function App() {
  const [cats, setCats] = React.useState<Cat[]>();
  const [cat, setCat] = React.useState<CatInfo>();

  const [page, setPage] = React.useState<number>(0);

  const [breed, setBreed] = React.useState<string>();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (page && breed)
      (async () => {
        let newCats: Cat[] = await Cats({
          breedID: breed,
          page,
        });

        // Filter existing cats
        // newCats.filter((cat: Cat[]) => {

        // });

        const tempCats: Cat[] = structuredClone(cats ? cats : newCats);

        cats ? tempCats.push(...newCats) : false;

        setCats(tempCats);
        setIsLoading(false);
      })();
  }, [breed, page]);

  return (
    <div style={{ padding: "2rem" }}>
      <Container>
        <h1>Cat Browser</h1>
        <div className="row" style={{ padding: "10px 0px" }}>
          <div className="col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="form-label" htmlFor="breed">
                Breed
              </label>
              <select
                id="breed"
                className="form-control"
                onChange={(e) => {
                  const selectedBreed = e.target.value;
                  setIsLoading(true);
                  setPage(page ? page + 1 : 1);
                  setBreed(selectedBreed);
                }}
              >
                <option value="">Select breed</option>
                {breeds?.map((row, i, array) => {
                  return (
                    <option key={i} value={row.id}>
                      {row.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          {cats?.map((row, i: number, array: object[]) => {
            return (
              <div key={row.id} className="col-md-3 col-sm-6 col-12">
                <div className="card">
                  <img className="card-img-top" src={row.url} />
                  <div className="card-body">
                    <a
                      className="btn btn-primary btn-block"
                      href={`/${row.id}`}
                    >
                      View details
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

          {!cats && (
            <div className="col-12" style={{ marginBottom: "20px" }}>
              No cats available
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-3 col-sm-6 col-12">
            <button
              disabled={!cats ? true : false}
              type="button"
              className="btn btn-success"
              onClick={() => {
              }}
            >
              {isLoading ? "Loading cats..." : "Load more"}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
