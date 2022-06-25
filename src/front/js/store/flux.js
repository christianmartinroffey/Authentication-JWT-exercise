const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      isLoggedIn: false,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "test",
            password: "test",
          }),
        };

        try {
          const resp = await fetch(
            "https://3001-christianma-authenticat-bqvjyp1j1ff.ws-eu47.gitpod.io/api/token",
            opts
          );

          if (resp.status !== 200) {
            alert("there's an error before the 200");
            return false;
          }
          const data = await resp.json();
          console.log("this came from the backend", data);
          localStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.log("there's an error logging in ");
        }
      },

      newUser: async (email, password) => {
        const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "this should be a new email",
            password: "this should be a new password",
          }),
        };

        try {
          const resp = await fetch(
            "https://3001-christianma-authenticat-bqvjyp1j1ff.ws-eu47.gitpod.io/api/signup",
            opts
          );

          if (resp.status !== 200) {
            alert("there's an error before the 200");
            return false;
          }
          const data = await resp.json();
          console.log("this came from the backend", data);
          localStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.log("there's an error logging in ");
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        console.log("log out triggered");
        setStore({ token: null });
      },

      getMessage: async () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          // fetching data from the backend
          const resp = await fetch(
            "https://3001-christianma-authenticat-bqvjyp1j1ff.ws-eu47.gitpod.io/api/hello",
            opts
          );
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      syncTokenFromLocalStore: () => {
        const token = localStorage.getItem("token") || null;
        console.log(token, "this is the token");
        setStore({ token });
      },
    },
  };
};

export default getState;
