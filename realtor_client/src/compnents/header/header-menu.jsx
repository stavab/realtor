import React from 'react';
import HeaderDropdownMenu from "./header-dropdown-menu";
import {Link} from 'react-router-dom';

class HeaderMenu extends React.Component {
    render() {
        const {label, href, innerMenu, activeItem, index, changeActiveItem} = this.props;
        return (
            <li onMouseOut={()=>changeActiveItem(-1)} onMouseOver={() => changeActiveItem(index)}>
                <Link to={href}>{label}</Link>
                <div className={`global-dropdown ${innerMenu && activeItem ? 'd-block' : 'd-none'}`}>
                    <div className={'container'} >
                        {innerMenu &&  <div className={"row"}>
                            {innerMenu.map((inner, i) => <HeaderDropdownMenu
                                {...inner}
                                key={i}/>
                            )}
                        </div>}
                    </div>
                </div>
            </li>
        )
    }
}

export default HeaderMenu
