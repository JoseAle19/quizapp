import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
export const SeePdf = ({ answersUser, duration }) => {
  let isCorrect = 0;
  let isIncorrect = 0;
  const styles = StyleSheet.create({
    table: {
      padding: 5,
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      width: "20%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      margin: "auto",
      marginTop: 5,
      fontSize: 10,
    },
  });

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.table}>
        <Text>
          Calificaciones
        </Text>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Nombre</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Malas</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Buenas</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Tiempo</Text>
            </View>
          </View>
          {answersUser &&
            answersUser.map((user, index) => {
              print(user, user.questionsAnswered);
              const arrayAnswers =
                Array.from(Object.keys(user.questionsAnswered), (clave) => {
                  return {
                    clave,
                    question: user.questionsAnswered[clave],
                  };
                });
              for (let i = 0; i < arrayAnswers.length; i++) {
                if (arrayAnswers[i].question.correct === true) {
                  isCorrect++;
                } else {
                  isIncorrect++;
                }
              }
              return (
                <View key={index} style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{user.user.name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{isIncorrect}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{isCorrect}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {duration * 60 - user.timeDone}s
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
      </Page>
    </Document>
  );
};
