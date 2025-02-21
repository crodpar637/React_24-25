import { createDrawerNavigator } from '@react-navigation/drawer';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { HomeScreen } from './navigation/screens/Home';
import  AltaScreen  from './navigation/screens/Alta';
import { ListadoScreen } from './navigation/screens/Listado';
import {
  createStaticNavigation,
} from '@react-navigation/native';

const MyDrawer = createDrawerNavigator({
  screens: {
    Home: HomeScreen,
    Alta: AltaScreen,
    Listado: ListadoScreen,
  },
});

const Navigation = createStaticNavigation(MyDrawer);

export default function App() {
  return <GluestackUIProvider mode="light"><Navigation /></GluestackUIProvider>;
}