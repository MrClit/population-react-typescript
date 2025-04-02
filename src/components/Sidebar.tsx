import classes from './Sidebar.module.css'
import {useQuery} from "@tanstack/react-query";
import {fetchPopulation} from "../utils/http.js";
import {NavLink} from "react-router-dom";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import {useState} from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function Sidebar() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['population'],
    queryFn: fetchPopulation
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  let content;

  if (isLoading) {
    content = <LoadingIndicator/>;
  }

  if (isError) {
    content = <ErrorBlock title="An error ocurred" message="Failed to fetch population" />
  }

  if (data && !isError) {
    const continents = data.continentsList;
    content = continents.map(continent => (
      <li key={continent}>
        <NavLink
          to={`/region/${continent}`}
          className={({isActive}) => isActive ? classes.active : undefined}
        >
          {continent}
        </NavLink>
      </li>
    ))
  }

  return (
    <div className={`${classes.sidebar} ${isCollapsed ? classes.collapsed : ""}`}>
      <button onClick={toggleSidebar} className={classes.toggleButton}>
        {/*{isCollapsed ? "Expand" : "Collapse"}*/}
        {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </button>
      {!isCollapsed && (
        <>
          <h3>Population Viewer</h3>
          <ul>
            <li>
              <NavLink
                to={'/region/global'}
                className={({isActive}) => isActive ? classes.active : undefined}
              >
                🌍 Global
              </NavLink>
            </li>
            {content}
          </ul>
        </>
      )}

    </div>
  )
}