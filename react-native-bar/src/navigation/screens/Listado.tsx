import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Link, LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { Icon, ArrowRightIcon } from "@/components/ui/icon";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

export function ListadoScreen() {
  interface Plato {
    idplato: number;
    nombre: string;
    descripcion: string;
    precio: number;
  }

  const [datos, setDatos] = useState<Plato[]>([]);

  useEffect(() => {
    async function getPlatos() {
      let response = await fetch("http://localhost:3000/api/platos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      }
    }

    getPlatos();
  }, []); // Se ejecuta solo en el primer renderizado

  return (
    <>
      <ScrollView>
        {datos.map((plato) => (
          <Card className="p-5 rounded-lg max-w-[360px] m-3">
            {/* <Image
            source={{
              uri: "https://gluestack.github.io/public-blog-video-assets/yoga.png",
            }}
            className="mb-6 h-[240px] w-full rounded-md aspect-[263/240]"
            alt="image"
          /> */}
            <Text className="text-sm font-normal mb-2 text-typography-700">
              Plato {plato.idplato}
            </Text>
            <Heading size="md" className="mb-4">
              {plato.nombre}
            </Heading>
            <Text className="text-sm font-normal mb-2 text-typography-700">
              {plato.descripcion}
            </Text>
            <Link href="https://gluestack.io/" isExternal>
              <HStack className="items-center">
                <LinkText
                  size="sm"
                  className="font-semibold text-info-600 no-underline"
                >
                  Borrar
                </LinkText>
                <Icon
                  as={ArrowRightIcon}
                  size="sm"
                  className="text-info-600 mt-0.5 ml-0.5"
                />
              </HStack>
            </Link>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}
