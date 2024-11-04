import allimg from '../Imgs/allimg.png'
const CaughtUpBox = () => {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center mb-5 mt-5"
        style={{
          padding: "32px 12px",
          maxWidth: "446px",
          margin: "0 auto",
          textAlign: "center",
          backgroundColor: "#fff",
          borderTop: "1px solid #ddd", // Only top border
        borderBottom: "1px solid #ddd", 
        }}
      >
         <span style={{ backgroundRepeat: "no-repeat", backgroundPosition: "-245px 0px", height: "96px", width: "94px",backgroundImage:`url(${allimg})` }}>
                {/* <img src={allimg} alt="Insta_logo"  style={{ }}/> */}
              </span>
        <h3 className=" mb-0 mt-2" style={{ fontSize: "20px", fontWeight:"400" }}>
          You're all caught up
        </h3>
        <p className="text-muted mb-1" style={{ fontSize: "14px", fontWeight:"400" }}>
          You've seen all new posts from the past 3 days.
        </p>
        <p className='p-0 mt-1'  style={{ fontSize: "14px", fontWeight:"600", color:"#0095f6",textDecoration: "none" }}>
          View older posts
        </p>
      </div>
    );
  };
  
  export default CaughtUpBox;