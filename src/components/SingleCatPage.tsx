import React from "react";

import { Link, useParams } from "react-router-dom";

import getCat from "../helpers/getCat";

export default function CatInfo() {
  const { catID } = useParams();

  const [catInfo, setCatInfo] = React.useState<CatInfo>();

  React.useEffect(() => {
    (async () => {
      if (catID) {
        const catInfoResult = await getCat({ catID });
        setCatInfo(catInfoResult);
      }
    })();
  }, []);

  return (
    <>
      {catInfo && (
        <div className="container">
          <div className="card">
            <div className="card-header">
              <Link
                to={`/?breed=${catInfo.breeds[0].id}`}
                className="btn btn-primary"
              >
                Back
              </Link>
            </div>
            <img className="card-img" src={catInfo.url} />
            <div className="card-body">
              <h4>{catInfo.breeds[0].name}</h4>
              <h5>Origin: {catInfo.breeds[0].origin}</h5>
              <h6>{catInfo.breeds[0].temperament}</h6>
              <p>{catInfo.breeds[0].description}</p>
            </div>
          </div>
        </div>
      )}
      {!catInfo && <h5>Loading...</h5>}
    </>
  );
}
