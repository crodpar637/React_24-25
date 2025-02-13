import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  NativeBaseProvider,
  FlatList,
  ScrollView,
  Divider,
  Image,
  Spinner,
} from "native-base";
import { services } from "../services/services";

export default function News({ category }) {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    async function recuperarDatos() {
      try {
        let data = await services(category);

        setNewsData(data);
      } catch (error) {
        alert(error);
      }
    }

    recuperarDatos();
  }, []);
  return (
    <NativeBaseProvider>
      <ScrollView height={850}>
        <FlatList
          data={newsData}
          renderItem={({ item }) => (
            <View>
              <View>
                <Text>{item.title}</Text>
                <Text>{item.publishedAt}</Text>
                <Text>{item.description}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </NativeBaseProvider>
  );
}
