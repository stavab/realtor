import React from 'react';

import './homepage.css';
import HomePageTop from "./homepage_top";
import HomePageMainSearch from "./homepage_main_search";
import HomePageNewListings from "./homepage_new_listings";
import HomePageCityData from "./homepage_city_data";
import HomePageTrends from "./homepage_trends";
import HomePageTrendsCards from "./homepage_trends_cards";
import HomePageHalfImg from "./homepage_half_img_container";
import HomePageBottomGrid1 from "./homepage_bottom_grid1";
import HomePageLogoGrid from "./homepage_logo_grid";
import HomePageFooter from "./homepage_footer";


class HomePage extends React.Component {
    render() {
        return (
            <div>
                <HomePageTop/>
                <HomePageMainSearch/>
                <HomePageNewListings/>
                <HomePageCityData/>
                <HomePageTrends/>
                <HomePageTrendsCards/>
                <HomePageHalfImg/>
                <HomePageBottomGrid1/>
                <HomePageLogoGrid/>
                <HomePageFooter/>
            </div>
        )
    }
}
export default HomePage;
