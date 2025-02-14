import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  NativeBaseProvider,
  FlatList,
  ScrollView,
  Divider,
  Image,
  Spinner,
} from "native-base";
import { services } from "../services/services";
import moment from "moment";

export default function News({ route }) {
  const [newsData, setNewsData] = useState([]);
  const category = route.params.category;

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
  }, [category]);

  return (
    <NativeBaseProvider>
      <ScrollView height={850}>
        {newsData.length > 1 ? (
          <FlatList
            data={newsData}
            renderItem={({ item }) => (
              <>
                <View>
                  <View style={styles.newsContainer}>
                    {item.urlToImage && (
                      <Image
                        width={550}
                        height={250}
                        resizeMode={"cover"}
                        source={{
                          uri: item.urlToImage,
                        }}
                        alt={item.title}
                      />
                    )}

                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>
                      {moment(item.publishedAt).format("LLL")}
                    </Text>
                    <Text style={styles.newsDescription}>
                      {item.description}
                    </Text>
                  </View>
                </View>
                <Divider my={2} bg="#e0e0e0" />
              </>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.spinner}>
            <Spinner color="danger.400" />
          </View>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  newsContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "600",
  },
  newsDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  date: {
    fontSize: 14,
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 400,
  },
});
