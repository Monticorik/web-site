import AppWrapper from "../../appWrapper/AppWrapper";
import { BackButton } from "../../buttons/Buttons";
import Label from "../../label/Label";
import Cat404 from "./404Cat";

import "./404.scss";

const Page404 = () => {
    return(
        <AppWrapper withoutTabIndex="page-404">
            <aside className="filters_section like_page">
                <BackButton/>
                <Label label='404'/>
            </aside>
            <h1 className="header-404">
                <span>Sorry!</span>
            </h1>
            <div className="title-404">
                <span>We tried, but couldn`t find that page</span>
            </div>
            <Cat404/>
        </AppWrapper>
    );
};

export default Page404;