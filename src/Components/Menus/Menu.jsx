import React, { useState, useEffect } from "react";

import styles from "./Menu.css";

const MenuBar = (props) => {
  return (
    <>
      <div class="menu">
        <a class="item2">Climate Changes.org</a>
        <a class="item4">Carbon Emissions</a>
        <a class="item4">Temperature Changes</a>
        <a class="item4">Sea-levels</a>
      </div>
    </>
  );
};

export default MenuBar;
