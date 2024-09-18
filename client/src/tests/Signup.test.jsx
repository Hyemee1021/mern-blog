import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Greet } from "../pages/Greet";
import "@testing-library/jest-dom/vitest";
import { SignUp } from "../pages/SignUp";

describe("Signup component", () => {
  it("Signup success move to signin page", () => {
    render(<SignUp />);

    expect();
  });
});
