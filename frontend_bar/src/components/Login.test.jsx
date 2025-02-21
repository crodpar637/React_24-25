import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import Login from "./Login";

vi.mock("../stores/useUserStore", () => ({
  default: () => ({
    setUser: vi.fn(),
  }),
}));

globalThis.fetch = vi.fn();

describe("Login Component", () => {
  it("renderiza el formulario correctamente", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const buttons = screen.getAllByText("Iniciar sesión");
    expect(buttons[0]).toBeInTheDocument(); // Comprobamos el primer resultado

    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
  });

  it("muestra errores de validación si los campos están vacíos", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    expect(
      await screen.findByText("El correo electrónico es obligatorio.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("La contraseña es obligatoria.")
    ).toBeInTheDocument();
  });
});
