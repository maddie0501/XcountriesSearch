import React, { useEffect, useState } from "react";
import axios from "axios";

const Countrylist = () => {
  const [country, setcountry] = useState([]);
  const [search, setsearch] = useState("");
  const [debounceTimeout, setdebounceTimeout] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchcountry = async () => {
      try {
        const res = await axios.get(
          " https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        //console.log(res);
        setcountry(res.data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setloading(false);
      }
    };
    fetchcountry();
  }, []);

  const debounceSearch = (event, debounceTimeout, fetchcountry) => {
    const val = event.target.value;
    setsearch(val);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const Timeout = setTimeout(async () => {
      await fetchcountry(val);
    }, 500);

    setdebounceTimeout(Timeout);
  };

  const filtercountry = search
    ? country.filter(({ common }) =>
        common.toLowerCase().includes(search.toLowerCase())
      )
    : country;

  return (
    <div>
      <nav
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingBottom: "20px",
          backgroundColor: "#ccc000080",
        }}
      >
        <form>
          <input
            style={{
              width: "800px",
              padding: "5px",
            }}
            type="text"
            placeholder="Search for countries..."
            value={search}
            onChange={(e) => debounceSearch(e, debounceTimeout)}
          />
        </form>
      </nav>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          paddingTop: "30px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <h4>Loading countries...</h4>
        ) : (
          filtercountry.map(({ common, png }, index) => (
            <Countrycard common={common} png={png} key={index} />
          ))
        )}
      </div>
    </div>
  );
};

function Countrycard({ common, png }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "200px",
        width: "200px",
        alignItems: "center",
        borderRadius: "5px",
        border: "1px solid black",
        gap: "5px",
      }}
    >
      <img
        src={png}
        alt={`Flag of ${common}`}
        style={{ height: "100px", width: "100px" }}
      />
      <h3>{common} flag</h3>
    </div>
  );
}

export default Countrylist;
