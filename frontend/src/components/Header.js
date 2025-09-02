import { NavLink } from "react-router-dom";

function Header(props) {
  const navLinks = props.navLinks;

  return (
    <header className="">
      <ul className="flex gap-x-8 w-fit items-center bg-neutral-800 text-neutral-200 p-4 rounded-md">
        {Object.entries(navLinks).map((navLink) => {
          const route = navLink[0];
          const navName = navLink[1];
          return (
            <li key={route}>
              <NavLink activeClassName="active" to={route}>
                {navName}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </header>
  );
}

export default Header;
