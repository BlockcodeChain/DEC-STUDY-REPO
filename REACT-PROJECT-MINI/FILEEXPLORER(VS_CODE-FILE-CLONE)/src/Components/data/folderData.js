const explorer = {
  id: "1",
  name: "root",
  isFolder: true,
  items: [
    {
      id: "2",
      name: "public",
      isFolder: true,
      items: [
        {
          id: "3",
          name: "index.html",
          isFolder: false,
          items: []
        },
        {
          id: "4",
          name: "favicon.ico",
          isFolder: false,
          items: []
        }
      ]
    },

    // -----------------------
    // SRC FOLDER
    // -----------------------
    {
      id: "5",
      name: "src",
      isFolder: true,
      items: [
        {
          id: "6",
          name: "components",
          isFolder: true,
          items: [
            {
              id: "7",
              name: "Navbar.jsx",
              isFolder: false,
              items: []
            },
            {
              id: "8",
              name: "Footer.jsx",
              isFolder: false,
              items: []
            },
            {
              id: "9",
              name: "Button.jsx",
              isFolder: false,
              items: []
            }
          ]
        },

        {
          id: "10",
          name: "hooks",
          isFolder: true,
          items: [
            {
              id: "11",
              name: "useFetch.js",
              isFolder: false,
              items: []
            }
          ]
        },

        {
          id: "12",
          name: "utils",
          isFolder: true,
          items: [
            {
              id: "13",
              name: "helpers.js",
              isFolder: false,
              items: []
            },
            {
              id: "14",
              name: "constants.js",
              isFolder: false,
              items: []
            }
          ]
        },

        {
          id: "15",
          name: "styles",
          isFolder: true,
          items: [
            {
              id: "16",
              name: "global.css",
              isFolder: false,
              items: []
            },
            {
              id: "17",
              name: "app.css",
              isFolder: false,
              items: []
            }
          ]
        },

        {
          id: "18",
          name: "App.js",
          isFolder: false,
          items: []
        },
        {
          id: "19",
          name: "index.js",
          isFolder: false,
          items: []
        }
      ]
    }
  ]
};
export default explorer;