let theme = {
  plain: {
    color: "#000000",
    backgroundColor: "#ffffffaa",
    borderRadius: '10px',
    fontSize: '14px'
  },
  styles: [{
    types: ["comment"],
    style: {
      color: "rgb(0, 128, 0)"
    }
  }, {
    types: ["builtin"],
    style: {
      color: "rgb(0, 112, 193)"
    }
  }, {
    types: ["number", "variable", "inserted"],
    style: {
      color: "rgba(16,185,129)"
    }
  }, {
    types: ["operator"],
    style: {
      color: "rgb(0, 0, 0)"
    }
  }, {
    types: ["constant", "char"],
    style: {
      color: "rgba(16,185,129)"
    }
  }, {
    types: ["tag"],
    style: {
      color: "rgb(128, 0, 0)"
    }
  }, {
    types: ["attr-name"],
    style: {
      color: "rgb(255, 0, 0)"
    }
  }, {
    types: ["deleted", "string"],
    style: {
      color: "rgba(139,92,246)"
    }
  }, {
    types: ["changed", "punctuation"],
    style: {
      color: "rgba(51,51,51)"
    }
  }, {
    types: ["function", "keyword"],
    style: {
      color: "rgba(236,72,153)"
    }
  }, {
    types: ["keyword"],
    style: {
      color: "rgba(59,130,246)"
    }
  }, {
    types: ["class-name"],
    style: {
      color: "rgb(38, 127, 153)"
    }
  }]
};

export default theme;
