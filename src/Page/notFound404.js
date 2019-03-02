import React from 'react';

class notFound404 extends React.Component {
    render(){
        return(
            <div style={{position: "relative", top: "120px", borderTop: "1px solid #e1e7ec"}}>
                 {/* Page Content */}
                <div className="container padding-top-3x padding-bottom-3x mb-1"><img className="d-block m-auto" src="img/404_art.jpg" style={{width: "100%", maxWidth: "550px"}} alt="404"/>
                    <div className="padding-top-1x mt-2 text-center">
                        <h3>Page Not Found</h3>
                        <p>It seems we can’t find page you are looking for. <br/> 
                        <a href="/">Go back to Homepage</a>
                        <br/>Or try using search at the top right corner of the page.</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default notFound404;