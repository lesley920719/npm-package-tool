import React from "react";
import homeStyle from "./style.scss";
import navObj from "@base/config.toml";
import { Link } from "react-router-dom";

export default class PageHome extends React.PureComponent {
  private nav = [
    ...(navObj.packages ? navObj.packages : navObj).list.reverse(),
    "blueprint-koa",
    "apib-json",
    "tscn",
  ];

  render(): React.ReactElement {
    return (
      <div className={homeStyle.homePage}>
        <main>
          <Link to={"/"}>
            <span>
              <img src="./img/logo.png" />
            </span>
          </Link>
            {this.nav.map((n: string) => (
              <Link key={n} to={`/demos/${n}`}>
                <p>{n}</p>
              </Link>
            ))}
        </main>
      </div>
    );
  }
}
