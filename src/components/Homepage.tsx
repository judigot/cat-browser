import React from "react";

import { Link, useSearchParams } from "react-router-dom";

import Breeds from "../helpers/getBreeds";

import Cats from "../helpers/getCats";

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const breedParam = searchParams.get("breed");

  const [breeds, setBreeds] = React.useState<Breed[]>();

  const [cats, setCats] = React.useState<Cat[]>();

  const [catIds, setCatIds] = React.useState<string[]>();

  const [page, setPage] = React.useState<number>(1);

  const [breed, setBreed] = React.useState<string>(breedParam || "");

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [isNoResult, setIsNoResult] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      const breeds: Breed[] = await Breeds();
      setBreeds(breeds);
    })();
  }, []);

  React.useEffect(() => {
    if (page && breed) {
      setIsLoading(true);
      loadCats();
    }
    if (!breed) {
      setCats([]);
    }
  }, [breed, page]);

  const loadCats = async () => {
    let newCatsResult: Cat[] = await Cats({
      breedID: breed,
      page,
    });

    let tempCats: Cat[] = [];
    const ids: string[] = [];

    if (newCatsResult.length) {
      // Initial cats
      if (!cats) {
        tempCats = structuredClone(newCatsResult);
      }

      // Push new cats
      if (cats && catIds) {
        tempCats = structuredClone(cats);

        // Filter existing cats
        const newCats = newCatsResult.filter(
          (cat: Cat) => !catIds.includes(cat.id)
        );

        if (newCats.length) {
          tempCats.push(...newCats.values());
        }

        if (!newCats.length) {
          // Hide "Load more" button
          setIsNoResult(true);
        }
      }

      // Get cats' ids
      tempCats.map((cat) => {
        ids.push(cat.id);
      });

      setCatIds(ids);
      setCats(tempCats);
      setIsLoading(false);
    }

    if (!newCatsResult.length) {
      setIsNoResult(true);
    }
  };

  const clearPreviousCats = () => {
    setPage(1);
    setCats([]);
    setCatIds([]);
    setIsNoResult(false);
    return true;
  };

  return (
    <>
      <div className="row" style={{ padding: "10px 0px" }}>
        <div className="col-md-3 col-sm-6 col-12">
          <div className="form-group">
            <label className="form-label" htmlFor="breed">
              Breed
            </label>
            <select
              value={breed}
              id="breed"
              className="form-control"
              onChange={(e) => {
                clearPreviousCats();
                const selectedBreed = e.target.value;
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
                  <Link to={`/${row.id}`} className="btn btn-primary btn-block">
                    View details
                    {/* </a> */}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {!cats?.length && (
          <div className="col-12" style={{ marginBottom: "20px" }}>
            No cats available
          </div>
        )}
      </div>
      {!isNoResult && (
        <div className="row">
          <div className="col-md-3 col-sm-6 col-12">
            <button
              disabled={(() => {
                if (!cats?.length) return true;
                if (isLoading) return true;

                return false;
              })()}
              type="button"
              className="btn btn-success"
              onClick={() => {
                setIsLoading(true);
                setPage(page + 1);
              }}
            >
              {isLoading ? "Loading cats..." : "Load more"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
