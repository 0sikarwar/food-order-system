const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)"
};
export const formStyles = {
      variants: {
        floating: (props) => ({
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles
              }
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
              ...activeLabelStyles
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: props.colorMode === 'dark' ? 'gray.800' : "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            }
          }
        })
      }
}