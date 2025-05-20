"use client";

import { store } from "@/redux/features/store";
import { Provider as ReduxProvider } from "react-redux";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default Providers;
