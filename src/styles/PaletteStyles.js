const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    colors: {
        height: "90%"
    },
    goBack: {
        height: "50%",
        marginBottom: "-5px",
        width: "20%",                
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",        
        opacity: "1",
        backgroundColor: "black",
        position: "relative",
        "& a": {
            width: "100px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            top: "50%",
            left: "50%",
            marginLeft: "-50px",
            marginTop: "-15px",
            textAlign: "center",
            outline: "none",
            background: "rgba(255, 255, 255, 0.3)",
            fontSize: "1rem",
            lineHeight: "30px",
            color: "white",
            textTransform: "uppercase",
            border: "none; ",
            textDecoration: "none",
        }
    },
    footer: {
        backgroundColor: "white",
        height: "5vh",
        display: "flex",
        justifyContent:  "flex-end",
        alignItems: "center",
        fontWeight: "bold",
      },
      emoji: {
        fontSize: "1.5rem",
        margin: "0 1rem",
      }
};

export default styles;