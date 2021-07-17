import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  country: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  topBtn: {
    justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  appName: {
    color: '#fff',
    borderRadius: 25,
    fontSize: 30,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    marginTop: 20,
  },
  modalView: {
    marginTop: "50%",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  filterModalView: {
    marginTop: "90%",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  countryList: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 5,
    paddingVertical: 10,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderColor: '#1a75ff',
    borderWidth: 2,
    backgroundColor: 'rgba(50,100,250,0.2)',
    width: "80%",
    justifyContent: "center",
    alignSelf: 'center'
  },
  countryName: {
    color: "#fff",
    fontFamily: "monospace",
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1
  },
  categoryList: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 5,
    paddingVertical: 10,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderColor: 'limegreen',
    borderWidth: 2,
    backgroundColor: 'rgba(50,250,10,0.2)',
    width: "80%",
    justifyContent: "center",
    alignSelf: 'center'
  },
  categoryName: {
    color: "#fff",
    fontFamily: "monospace",
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1
  },
  input: {
    height: 50,
    marginVertical: 12,
    borderWidth: 3,
    borderColor: '#1a75ff',
    backgroundColor: '#fff',
    padding: 15,
    color: '#000',
    fontSize: 15,
    borderRadius: 20,
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  defaultSearchImage: {
    height: 400,
    width: 'auto',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  defaultImageText: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: "90%",
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 10
  },
  searchNow: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'serif'
  }
});