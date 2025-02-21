import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SignUp from "./Signup";

// Mocks de módulos y funciones
vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../config", () => ({
  apiUrl: "https://mockapi.com", // Mock para la URL de la API
}));

// Mock de window.alert
const alertMock = vi.fn();
globalThis.alert = alertMock;

// Test para el componente SignUp
describe("SignUp Component", () => {
  it("renderiza el formulario correctamente", () => {
    render(<SignUp />);

    // Verifica que los campos del formulario están presentes
    expect(screen.getByLabelText("Nombre de usuario")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar contraseña")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
  });

  it("muestra errores de validación si los campos están vacíos", async () => {
    render(<SignUp />);

    // Intenta enviar el formulario con campos vacíos
    fireEvent.click(screen.getByText("Registrarse"));

    // Espera y verifica que se muestran los errores de validación
    expect(
      await screen.findByText("El nombre de usuario es obligatorio.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("El correo electrónico es obligatorio.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("La contraseña es obligatoria.")
    ).toBeInTheDocument();
  });

  it("llama a la API y maneja la respuesta correctamente", async () => {
    render(<SignUp />);

    // Completa el formulario con datos válidos
    fireEvent.change(screen.getByLabelText("Nombre de usuario"), {
      target: { value: "usuario123" },
    });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "usuario@ejemplo.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirmar contraseña"), {
      target: { value: "password123" },
    });

    // Mock de la función fetch
    const mockResponse = {
      ok: true,
      json: () =>
        Promise.resolve({
          ok: true,
          mensaje: "Usuario registrado correctamente.",
          datos: {},
        }),
    };
    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    // Envía el formulario
    fireEvent.click(screen.getByText("Registrarse"));

    // Verifica que la API fue llamada
    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));

    // Verifica que la API fue llamada
    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));

    // Verifica si la redirección o mensaje es correcto
    expect(alertMock).toHaveBeenCalledWith("Usuario registrado correctamente.");
  });

  it("muestra un mensaje de error si la API falla", async () => {
    render(<SignUp />);

    // Completa el formulario con datos válidos
    fireEvent.change(screen.getByLabelText("Nombre de usuario"), {
      target: { value: "usuario123" },
    });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "usuario@ejemplo.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirmar contraseña"), {
      target: { value: "password123" },
    });

    // Mock de la función fetch para una respuesta con error
    const mockErrorResponse = {
      ok: false,
      json: () =>
        Promise.resolve({ mensaje: "Error al registrar el usuario." }),
    };
    globalThis.fetch = vi.fn().mockResolvedValue(mockErrorResponse);

    // Envía el formulario
    fireEvent.click(screen.getByText("Registrarse"));

    // Verifica que se muestra el mensaje de error de la API
    expect(
      await screen.findByText("Error al registrar el usuario.")
    ).toBeInTheDocument();
  });
});
