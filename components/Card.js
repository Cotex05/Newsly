import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableWithoutFeedback, TouchableHighlight, Linking, TouchableOpacity, Share, Vibration } from 'react-native';
import { Icon } from 'react-native-elements';
import { Audio } from 'expo-av';


const Card = (props) => {

    var likesCount = Math.floor(Math.random() * 1000);

    const PATTERN = [
        1 * 0,
        1 * 200,
        1 * 200,
        1 * 300
    ];

    const [lines, setLines] = useState(3);
    const [likeColor, setLikeColor] = useState('grey');
    const [likeIcon, setLikeIcon] = useState('favorite-outline');
    const [likes, setlikes] = useState(likesCount);
    const [hider, setHider] = useState(0);
    const [hideIcon, setHideIcon] = useState('eye');
    const [sound, setSound] = useState();

    async function playSound() {
        // console.log('Loading Sound...');
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/likeSound.mp3')
        );
        setSound(sound);
        // console.log('Playing Sound');
        await sound.playAsync();
    }

    const handleLike = () => {
        if (likeColor === 'grey') {
            setLikeColor('limegreen');
            setLikeIcon('favorite');
            setlikes(likes + 1);
            playSound();
        } else {
            setLikeColor('grey');
            setLikeIcon('favorite-outline');
            setlikes(likes - 1);
        }
    }

    const handleShare = async () => {
        try {
            Vibration.vibrate(PATTERN);
            const result = await Share.share({
                message:
                    `Newsly: Daily News App ${props.sharingUrl}`,
                url: props.sharingUrl
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleHideView = () => {
        if (hideIcon === 'eye') {
            setHideIcon('eye-off');
            setHider(10);
        } else {
            setHideIcon('eye');
            setHider(0);
        }
    }

    return (
        <View style={styles.Card}>

            <View style={styles.CardTop}>
                <Image style={styles.CardImage} source={{ uri: props.imgUrl }} blurRadius={hider} />
                <View style={styles.hideBtn}>
                    <Icon name={hideIcon} type="ionicon" color="#fff" onPress={handleHideView} />
                </View>
                <TouchableWithoutFeedback onPress={() => Linking.openURL(props.sourceUrl)}>
                    <View style={styles.CardTitle}>
                        <Text style={styles.title}>{props.title}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.CardDescription}>
                <Text numberOfLines={lines} style={styles.description} onPress={() => setLines(15)}>
                    {props.description}
                </Text>
            </View>
            <View style={styles.CardBottom}>
                <TouchableHighlight style={{ marginHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Text style={{ color: "limegreen", paddingHorizontal: 10, paddingVertical: 2 }}>{likes}</Text>
                            <Icon
                                name={likeIcon}
                                color={likeColor}
                                size={30}
                                onPress={handleLike}
                            />
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Text style={{ color: "#1a75ff", paddingHorizontal: 10, paddingVertical: 2 }}>Share</Text>
                            <TouchableOpacity onPress={handleShare}>
                                <Icon
                                    name="share"
                                    color="#1a75ff"
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableHighlight>
                <View>
                    <Text style={styles.date}>{props.date}</Text>
                    <Text style={styles.source} onPress={() => Linking.openURL(props.sourceUrl)}>{props.source}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Card: {
        borderColor: 'grey',
        borderBottomWidth: 2,
        borderRadius: 20,
        marginVertical: 20
    },
    CardTop: {
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0,100,200,0.5)',
        borderRadius: 30
    },
    hideBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 10,
        borderBottomLeftRadius: 20
    },
    CardTitle: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingVertical: 5,
        paddingHorizontal: 20,
        flexDirection: 'row',
        width: "100%"
    },
    title: {
        color: '#fff',
        fontFamily: "sans-serif-medium",
        fontSize: 20,
        letterSpacing: 1
    },
    CardImage: {
        height: 350,
        width: "95%",
        marginHorizontal: 20,
        marginVertical: 10,
        alignSelf: 'center',
        resizeMode: 'cover',
        borderRadius: 25,
    },
    CardDescription: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        marginTop: 10
    },
    description: {
        color: 'rgba(255,255,255,0.75)',
        fontSize: 16,
        fontFamily: 'serif'
    },
    date: {
        color: 'grey',
        paddingHorizontal: 20,
        alignSelf: 'flex-end'
    },
    source: {
        color: '#1a75ff',
        paddingHorizontal: 15,
        opacity: 0.7,
        paddingVertical: 5,
        alignSelf: 'flex-end'
    },
    CardBottom: {
        flexDirection: 'row',
        margin: 8,
        justifyContent: 'space-between'
    }
});

export default Card;