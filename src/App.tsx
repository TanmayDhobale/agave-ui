import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./app.css";
import { routeTree } from "./routeTree.gen";
import { AgaveConnectionProvider } from "./api/ws/AgaveConnectionProvider";
import { useSetAtom } from "jotai";
import { containerElAtom } from "./atoms";
import { useCallback } from "react";
import * as colors from "./colors";
import { kebabCase } from "lodash";
import AgaveLogo from "./assets/agave.png";

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// set up favicon and title for Agave
document.getElementById("favicon")?.setAttribute("href", AgaveLogo);
document.title = "Agave Validator Dashboard";

export default function App() {
  const setContainerEl = useSetAtom(containerElAtom);

  const setRefAndColors = useCallback(
    (el: HTMLDivElement) => {
      setContainerEl(el);
      Object.entries(colors).forEach(([name, value]) => {
        el.style.setProperty(`--${kebabCase(name)}`, value);
      });
    },
    [setContainerEl],
  );

  return (
    <Theme
      className="app"
      appearance="dark"
      ref={setRefAndColors}
      scaling="90%"
    >
      <AgaveConnectionProvider>
        <RouterProvider router={router} />
      </AgaveConnectionProvider>
    </Theme>
  );
}
