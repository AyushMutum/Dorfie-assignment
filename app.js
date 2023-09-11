const countryDropdown = document.getElementById("country-dropdown");
      const stateDropdown = document.getElementById("state-dropdown");
      const cityDropdown = document.getElementById("city-dropdown");

      // Fetch countries using the api
      fetch("https://d32sbion19muhj.cloudfront.net/pub/interview/countries")
        .then((response) => response.json())
        .then((data) => {
          if (data && data.status === "success" && Array.isArray(data.data)) {
            const countries = data.data;

            countries.forEach((country) => {
              const option = document.createElement("option");
              option.value = country.id;
              option.text = country.name;
              countryDropdown.appendChild(option);
            });
          } else {
            console.error("Invalid or empty response for countries.");
          }
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
        });

      countryDropdown.addEventListener("change", () => {
        const selectedCountryId = countryDropdown.value;

        stateDropdown.innerHTML = '<option value="">Select State</option>';
        cityDropdown.innerHTML = '<option value="">Select City</option>';

        // Fetch states
        if (selectedCountryId) {
          fetch("https://d32sbion19muhj.cloudfront.net/pub/interview/states")
            .then((response) => response.json())
            .then((data) => {
              if (
                data &&
                data.status === "success" &&
                Array.isArray(data.data)
              ) {
                const states = data.data;

                // Filter states based on the selected country
                const filteredStates = states.filter(
                  (state) => state.country_id == selectedCountryId
                );

                filteredStates.forEach((state) => {
                  const option = document.createElement("option");
                  option.value = state.id;
                  option.text = state.name;
                  stateDropdown.appendChild(option);
                });
              } else {
                console.error("Invalid or empty response for states.");
              }
            })
            .catch((error) => {
              console.error("Error fetching states:", error);
            });
        }
      });

      stateDropdown.addEventListener("change", () => {
        const selectedStateId = stateDropdown.value;

        cityDropdown.innerHTML = '<option value="">Select City</option>';

        // Fetch cities
        if (selectedStateId) {
          fetch("https://d32sbion19muhj.cloudfront.net/pub/interview/cities")
            .then((response) => response.json())
            .then((data) => {
              if (
                data &&
                data.status === "success" &&
                Array.isArray(data.data)
              ) {
                const cities = data.data;

                const filteredCities = cities.filter(
                  (city) => city.state_id == selectedStateId
                );

                filteredCities.forEach((city) => {
                  const option = document.createElement("option");
                  option.value = city.id;
                  option.text = city.name;
                  cityDropdown.appendChild(option);
                });
              } else {
                console.error("Invalid or empty response for cities.");
              }
            })
            .catch((error) => {
              console.error("Error fetching cities:", error);
            });
        }
      });