import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Dimensions, ScrollView} from "react-native";
import CustomHeader from "../components/CustomElements/CustomHeader";
import ContentView from "../components/ContentView";
import CustomButton from "../components/CustomElements/CustomButton";
import CircledIcon from "../components/CustomElements/CircledIcon";
import Inst from "../media/Icons/Inst.svg"

function Policy({navigation},props) {
    return (
        <View scroll={true}>
            <CustomHeader hasBackButton={true} title={"Пользовательское соглашение"} goBackAction={navigation.goBack} />
            <ContentView style={{backgroundColor:"white", height:Dimensions.get("window").height}}>
                <Text style={styles.textBold}>Пользовательское Соглашение сервиса MALI</Text>
                <Text style={styles.textInfo}>
                    Обществом с ограниченной ответственностью «_______» (далее – MALI) разработана платформа для оказания услуг владельцам домашних животных, доступная на вебсайте по адресу mali-dts.ru или в форме мобильного приложения (далее – Платформа). Целью данной Платформы является предоставление владельцам домашних животных услуг по поиску животных и размещению объявлений с животными.
                    Целью настоящего документа является регламентирование доступа к Платформе и условий ее использования.
                    Вы понимаете и признаете, что компания MALI не является стороной каких-либо соглашений, договоренностей и договорных отношений, которые могут возникать между Пользователями Платформы.
                    1. Общие положения
                    1.1. Заказчик и Исполнитель самостоятельно договариваются о необходимой Услуге, согласовывая параметры заказа и его стоимость в индивидуальном порядке. Оплата Услуг осуществляется пользователями напрямую друг другу, вне Платформы.
                    1.3. Соглашение считается заключенным в момент получения Пользователем доступа к Платформе. При отсутствии согласия на заключение Соглашения, Пользователь обязан прекратить доступ к Платформе.
                    1.4. Соглашение размещено на сайте по адресу __________ и может быть изменено MALI в одностороннем порядке без уведомления Пользователей. Новая редакция Соглашения вступит в силу для всех Пользователей с момента размещения ее на сайте.
                    2. Учетная запись
                    2.1. Для использования Платформы Пользователь должен пройти процедуру регистрации. После успешного прохождения регистрации для Пользователя создается учетная запись.
                    2.2. Пользователь должен предоставить полную и достоверную информацию о себе и своевременно обновлять её в своём профиле или путем уведомления компании MALI в целях обеспечения ее актуальности и достоверности на протяжении всего срока договорных отношений с компанией MALI. В случае сомнений в достоверности информации, MALI вправе запросить у Пользователя подтверждающие документы и иные данные, идентифицирующие Пользователя, в случаях предусмотренных условиями Соглашения, либо законодательством Российской Федерации.
                    2.3. Если данные Пользователя, указанные в предоставленных им документах, не соответствуют данным, указанным при регистрации, а также в случае, когда данные, указанные при регистрации, не позволяют идентифицировать Пользователя, MALI вправе отказать Пользователю в доступе к учетной записи.
                    2.4. При регистрации Пользователь самостоятельно определяет логин и пароль (в случае наличия такого функционала), требования к которым могут быть установлены MALI. Пользователь обязуется не передавать логин и пароль третьим лицам и несет ответственность за конфиденциальность логина и пароля. MALI не несет ответственности за последствия получения третьими лицами доступа к учетной записи Пользователя. Если Пользователь не уведомил MALI о несанкционированном доступе к своей учетной записи, любые действия, совершенные с использованием учетной записи Пользователя, считаются совершенными им самим.
                    2.5. Пользователь вправе зарегистрировать не более одной учетной записи.
                    2.6. Компания MALI в целях обеспечения прозрачности, повышения уровня доверия либо предотвращения или выявления случаев мошенничества, может (но не обязана) прибегать к верификации некоторых данных, указанных Пользователями в профиле. В частности, это касается указанного номера телефона.
                    2.7. Тот факт, что компания MALI не препятствует размещать Объявления (под Объявлением понимается запрос в мобильном приложении с указанием необходимых параметров будущего Объявления), не может толковаться, как подтверждение достоверности представленной Пользователями информации по умолчанию.
                    2.8. Компания MALI не может гарантировать достоверность, надежность и точность любой информации, прошедшей процедуру верификации.
                    2.9. MALI вправе по своему усмотрению без объяснения причин заблокировать или удалить учетную запись Пользователя, запретить Пользователю доступ к Сервису полностью или частично, удалить любой размещенный Пользователем контент. MALI воспользуется этим правом, если Пользователем нарушены условия Соглашения.
                    2.10. Регистрацией в приложении Пользователь подтверждает достижение возраста 18 лет и наличие гражданства Российской Федерации. В ином случае пользователь обязуется удалить приложение.
                    3. Обязательства всех Пользователей Платформы
                    3.1. Пользователь гарантирует наличие необходимых прав и полномочий для заключения и исполнения Соглашения.

                </Text>
                <View style={styles.actionView}>
                    <CustomButton title={"Позвонить"} style={{width:220}} />
                    <CircledIcon style={{marginLeft:20}} image={Inst}/>
                </View>
            </ContentView>
        </View>
    );
}

const styles = StyleSheet.create({
    textBold:{
        fontSize:18,
        fontWeight:"bold",
        marginTop:28,
    },
    textInfo:{
        marginTop:28,
        fontSize:14,
        lineHeight:22,

    },
    actionView:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:28
    }
})

export default Policy;