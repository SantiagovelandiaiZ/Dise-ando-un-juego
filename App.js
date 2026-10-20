import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, Pressable, StyleSheet, StatusBar } from 'react-native';

const bossImage = require('./assets/cf58e8533f5d3bdff75366d5ad5df046.gif');
const attacks = [
  { id: 'corte', title: 'CORTE INFERNAL', damage: 20, image: require('./assets/64bb7ef5be4b74382f483ce2c599ce33.gif'), description: 'Golpe rápido y seguro.' },
  { id: 'rostizar', title: 'ROSTIZAR', damage: 30, image: require('./assets/ROSTIZAR.gif'), description: 'Ataque de fuego cósmico.' },
  { id: 'zarpazo', title: 'ZARPAZO TRIPLE', damage: 40, image: require('./assets/ZARPASO TRIPLE.gif'), description: 'Mucho daño, pero el jefe contraataca.' },
];

export default function App() {
  const [playerHP, setPlayerHP] = useState(100);
  const [bossHP, setBossHP] = useState(100);
  const [heals, setHeals] = useState(1);
  const [turn, setTurn] = useState(0);
  const [message, setMessage] = useState('Galactus ha aparecido. Elige tu primer movimiento.');
  const [finished, setFinished] = useState(false);
  const [victory, setVictory] = useState(false);

  const attack = (move) => {
    if (finished) return;
    const newBossHP = Math.max(0, bossHP - move.damage);
    setBossHP(newBossHP);
    setTurn((v) => v + 1);
    if (newBossHP <= 0) {
      setFinished(true); setVictory(true);
      setMessage(`¡Victoria! Usaste ${move.title} y derrotaste a Galactus.`);
      return;
    }
    const damage = Math.floor(Math.random() * 13) + 12;
    const newPlayerHP = Math.max(0, playerHP - damage);
    setPlayerHP(newPlayerHP);
    if (newPlayerHP <= 0) {
      setFinished(true); setVictory(false);
      setMessage(`Galactus respondió con ${damage} puntos de daño. Has caído en combate.`);
    } else {
      setMessage(`${move.title}: infligiste ${move.damage} de daño. Galactus contraatacó y te quitó ${damage} puntos de vida.`);
    }
  };

  const heal = () => {
    if (finished || heals <= 0) return;
    const restored = Math.min(35, 100 - playerHP);
    if (restored === 0) { setMessage('Tu vida ya está al máximo. Guarda la curación para después.'); return; }
    setPlayerHP((hp) => Math.min(100, hp + 35));
    setHeals(0);
    const damage = Math.floor(Math.random() * 9) + 10;
    const newHP = Math.max(0, playerHP + restored - damage);
    setPlayerHP(newHP);
    setMessage(`¡Halo de curación! Recuperaste ${restored} de vida, pero Galactus aprovechó para hacerte ${damage} de daño.`);
    if (newHP <= 0) { setFinished(true); setVictory(false); setMessage('Galactus te derrotó mientras intentabas curarte.'); }
    setTurn((v) => v + 1);
  };

  const restart = () => { setPlayerHP(100); setBossHP(100); setHeals(1); setTurn(0); setMessage('Galactus ha aparecido. Elige tu primer movimiento.'); setFinished(false); setVictory(false); };
  const barColor = (hp) => hp > 55 ? '#41e18b' : hp > 25 ? '#ffbd4a' : '#ff4f67';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.kicker}>ARENA CÓSMICA • COMBATE POR TURNOS</Text>
          <Text style={styles.title}>GALACTUS</Text>
          <Text style={styles.subtitle}>El último guardián del universo</Text>
        </View>

        <View style={styles.bossCard}>
          <View style={styles.bossHeading}>
            <View><Text style={styles.eyebrow}>JEFE FINAL</Text><Text style={styles.bossName}>Galactus</Text></View>
            <Text style={styles.hpNumber}>{bossHP}/100 PV</Text>
          </View>
          <View style={styles.barTrack}><View style={[styles.barFill, { width: `${bossHP}%`, backgroundColor: barColor(bossHP) }]} /></View>
          <Image source={bossImage} style={styles.bossImage} resizeMode="contain" />
          <Text style={styles.imageCaption}>“Tu energía será mía.”</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.eyebrow}>TU VIDA</Text><Text style={styles.statValue}>{playerHP}<Text style={styles.statMax}> / 100</Text></Text>
            <View style={styles.barTrack}><View style={[styles.barFill, { width: `${playerHP}%`, backgroundColor: barColor(playerHP) }]} /></View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.eyebrow}>TURNO</Text><Text style={styles.statValue}>{turn}</Text>
            <Text style={styles.smallText}>Curaciones: {heals}/1</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>ELIGE TU ATAQUE</Text>
        <View style={styles.attackList}>
          {attacks.map((move) => (
            <Pressable key={move.id} onPress={() => attack(move)} disabled={finished} style={({ pressed }) => [styles.attackButton, finished && styles.disabled, pressed && !finished && styles.pressed]}>
              <Image source={move.image} style={styles.attackImage} resizeMode="contain" />
              <View style={styles.attackCopy}><Text style={styles.attackTitle}>{move.title}</Text><Text style={styles.attackDescription}>{move.description}</Text></View>
              <View style={styles.damagePill}><Text style={styles.damageText}>-{move.damage}</Text><Text style={styles.damageLabel}>DAÑO</Text></View>
            </Pressable>
          ))}
          <Pressable onPress={heal} disabled={finished || heals <= 0} style={({ pressed }) => [styles.healButton, (finished || heals <= 0) && styles.disabled, pressed && !finished && styles.pressed]}>
            <Image source={require('./assets/HALO DE CUARION.gif')} style={styles.attackImage} resizeMode="contain" />
            <View style={styles.attackCopy}><Text style={styles.attackTitle}>HALO DE CURACIÓN</Text><Text style={styles.attackDescription}>Recupera hasta 35 PV. Solo un uso.</Text></View>
            <View style={styles.healPill}><Text style={styles.healText}>{heals ? '+35' : 'USADO'}</Text></View>
          </Pressable>
        </View>

        <View style={styles.messageBox}><Text style={styles.messageLabel}>REGISTRO DE COMBATE</Text><Text style={styles.message}>{message}</Text></View>
        {finished && <View style={styles.endBox}><Text style={styles.endTitle}>{victory ? '¡UNIVERSO SALVADO!' : 'FIN DE LA PARTIDA'}</Text><Text style={styles.endText}>{victory ? `Derrotaste a Galactus en ${turn} turnos.` : 'Reúne fuerzas y vuelve a intentarlo.'}</Text><Pressable onPress={restart} style={styles.restartButton}><Text style={styles.restartText}>VOLVER A JUGAR</Text></Pressable></View>}

        <View style={styles.rules}><Text style={styles.rulesTitle}>CÓMO JUGAR</Text><Text style={styles.ruleText}>• Reduce la vida de Galactus a cero para ganar.</Text><Text style={styles.ruleText}>• Cada ataque provoca un contraataque del jefe.</Text><Text style={styles.ruleText}>• Usa tu única curación con estrategia.</Text><Text style={styles.ruleText}>• Si tu vida llega a cero, pierdes la batalla.</Text></View>
        <Text style={styles.credits}>DESARROLLADO POR SANTIAGO VELANDIA ISAZA</Text>
        <Text style={styles.footer}>Proyecto académico • React Native + Expo SDK 57</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#080b16' }, scroll: { padding: 18, paddingBottom: 36, maxWidth: 650, width: '100%', alignSelf: 'center' },
  header: { alignItems: 'center', paddingTop: 16, paddingBottom: 20 }, kicker: { color: '#8f9dbb', fontSize: 10, letterSpacing: 2, fontWeight: '800', textAlign: 'center' }, title: { color: '#f3f6ff', fontSize: 38, fontWeight: '900', letterSpacing: 5, marginTop: 7 }, subtitle: { color: '#9ca9c6', marginTop: 3, fontSize: 13 },
  bossCard: { backgroundColor: '#12182a', borderColor: '#303b59', borderWidth: 1, borderRadius: 20, padding: 16, overflow: 'hidden' }, bossHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }, eyebrow: { color: '#8e9bb8', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 }, bossName: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 3 }, hpNumber: { color: '#e4e9f8', fontSize: 13, fontWeight: '700' }, barTrack: { height: 10, backgroundColor: '#252d43', borderRadius: 20, overflow: 'hidden', marginTop: 7 }, barFill: { height: '100%', borderRadius: 20 }, bossImage: { width: '100%', height: 205, marginTop: 8 }, imageCaption: { color: '#8e9bb8', fontStyle: 'italic', textAlign: 'center', fontSize: 12, marginBottom: 2 },
  statsRow: { flexDirection: 'row', gap: 10, marginTop: 12 }, statCard: { flex: 1, padding: 14, borderRadius: 15, backgroundColor: '#12182a', borderColor: '#28334e', borderWidth: 1 }, statValue: { color: '#fff', fontSize: 25, fontWeight: '900', marginTop: 5 }, statMax: { color: '#8290ad', fontSize: 14, fontWeight: '600' }, smallText: { color: '#aeb8cf', fontSize: 12, marginTop: 8 },
  sectionTitle: { color: '#f3f6ff', fontSize: 14, fontWeight: '900', letterSpacing: 1.5, marginTop: 24, marginBottom: 10 }, attackList: { gap: 9 }, attackButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#151c30', borderWidth: 1, borderColor: '#303b59', borderRadius: 15, padding: 10, minHeight: 82 }, healButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#102820', borderWidth: 1, borderColor: '#2b6a53', borderRadius: 15, padding: 10, minHeight: 82 }, attackImage: { width: 58, height: 58, marginRight: 11, borderRadius: 9 }, attackCopy: { flex: 1 }, attackTitle: { color: '#f2f5ff', fontSize: 12, fontWeight: '900', letterSpacing: 0.5 }, attackDescription: { color: '#a5b0ca', fontSize: 11, marginTop: 5, lineHeight: 15 }, damagePill: { backgroundColor: '#442332', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7, alignItems: 'center', minWidth: 48 }, damageText: { color: '#ff8294', fontWeight: '900', fontSize: 15 }, damageLabel: { color: '#d8a0ac', fontSize: 8, fontWeight: '800', marginTop: 1 }, healPill: { backgroundColor: '#1b4939', borderRadius: 10, paddingHorizontal: 9, paddingVertical: 8 }, healText: { color: '#73e9b1', fontSize: 11, fontWeight: '900' }, disabled: { opacity: 0.38 }, pressed: { transform: [{ scale: 0.985 }], opacity: 0.85 },
  messageBox: { backgroundColor: '#0e1424', borderLeftWidth: 3, borderLeftColor: '#8c75ff', padding: 14, borderRadius: 12, marginTop: 17 }, messageLabel: { color: '#a99bff', fontSize: 10, letterSpacing: 1.4, fontWeight: '900', marginBottom: 6 }, message: { color: '#e3e8f8', fontSize: 13, lineHeight: 19 }, endBox: { alignItems: 'center', backgroundColor: '#211b39', borderColor: '#7661cb', borderWidth: 1, borderRadius: 15, padding: 18, marginTop: 12 }, endTitle: { color: '#fff', fontSize: 18, fontWeight: '900', textAlign: 'center' }, endText: { color: '#c4c9e1', fontSize: 12, marginTop: 5, textAlign: 'center' }, restartButton: { backgroundColor: '#8b75ff', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 12, marginTop: 13 }, restartText: { color: '#fff', fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  rules: { marginTop: 20, backgroundColor: '#101626', borderRadius: 15, padding: 15 }, rulesTitle: { color: '#e6ebff', fontSize: 12, fontWeight: '900', letterSpacing: 1.2, marginBottom: 8 }, ruleText: { color: '#aab5cf', fontSize: 12, lineHeight: 20 }, credits: { color: '#e4e9f8', textAlign: 'center', fontSize: 10, fontWeight: '900', letterSpacing: 1.1, marginTop: 22 }, footer: { color: '#687590', textAlign: 'center', fontSize: 10, marginTop: 6 },
});
