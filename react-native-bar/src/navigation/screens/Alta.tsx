import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import {
  useNavigation,
} from '@react-navigation/native';
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import { useState } from "react";


import React from "react";

function AltaScreen() {
  const navigation = useNavigation();
  const [datos, setDatos] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  });
  const [datosValidos, setDatosValidos] = useState({
    nombre: false, // NO hay error si vale false
    descripcion: false,
    precio: false,
  });

  const handleSubmit = async () => {
    if (validarDatos()) {
      // Enviamos los datos mediante fetch
      try {
        const response = await fetch("http://localhost:3000/api/platos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });

        if (response.ok) {
          const respuesta = await response.json();
          alert(respuesta.mensaje);
          if (respuesta.ok) {
            navigation.goBack(); // Volver a la página principal
          }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error:" + error);
      }
    }
  };

  function validarDatos() {
    const nombreValido = datos.nombre.trim() !== "";
    const descripcionValida = datos.descripcion.trim() !== "";
    const precioValido =
      !isNaN(Number(datos.precio)) && datos.precio.trim() !== "";

    setDatosValidos({
      nombre: !nombreValido, // False si es válido
      descripcion: !descripcionValida,
      precio: !precioValido,
    });

    // Si todos los campos son válidos, devolvemos true
    return nombreValido && descripcionValida && precioValido;
  }

  return (
    <VStack className="w-full max-w-[300px] rounded-md border border-background-200 p-4">
      <FormControl
        isInvalid={datosValidos.nombre}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Nombre</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="sm">
          <InputField
            type="text"
            placeholder="Nombre del plato"
            value={datos.nombre}
            onChangeText={(text) => setDatos({ ...datos, nombre: text })}
          />
        </Input>

        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            El nombre del plato es obligatorio
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl
        isInvalid={datosValidos.descripcion}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Descripcion</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="sm">
          <InputField
            type="text"
            placeholder="Descrición del plato"
            value={datos.descripcion}
            onChangeText={(text) => setDatos({ ...datos, descripcion: text })}
          />
        </Input>

        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            La descripción del plato es obligatoria
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl
        isInvalid={datosValidos.precio}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Precio</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="sm">
          <InputField
            type="text"
            placeholder="Precio del plato"
            value={datos.precio}
            onChangeText={(text) => setDatos({ ...datos, precio: text })}
          />
        </Input>

        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>El precio deber un número</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <Button className="w-fit self-end mt-4" size="sm" onPress={handleSubmit}>
        <ButtonText>Aceptar</ButtonText>
      </Button>
    </VStack>
  );
}

export default AltaScreen;
