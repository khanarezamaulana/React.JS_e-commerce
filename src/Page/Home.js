import React from 'react';
import Carousel from '../Components/Carousel';
import Content from '../Components/Content';

class Home extends React.Component {
    render(){
        return(
            <React.Fragment>
                <Carousel />
                <Content />
            </React.Fragment>
        )
    }
}
export default Home;