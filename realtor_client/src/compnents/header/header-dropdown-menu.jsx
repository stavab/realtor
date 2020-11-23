import React from 'react';

class HeaderDropdownMenu extends React.Component {
    render() {
        const {title,listItem} = this.props;

        return(
            <div className={"col-lg-4"}>
                <h4>{title}</h4>
                <ul className={"dropdown-list-items"}>
                    {listItem.map
                    ((item,i) => {return <li key={i}><a href={"https://www.realtor.com/tag/home-selling-guide/"}>{item}</a></li>})
                    }
                </ul>
            </div>
        )
    }
}
export default HeaderDropdownMenu;