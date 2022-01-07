
let roller; // スロットの回転状態を保持する変数

// この関数が実行されたとき各スロットを一回転させる
function roll() {
    $(".slot1").html(0);
    $(".slot1").html(9);

    $(".slot2").html(0);
    $(".slot2").html(9);

    $(".slot3").html(0);
    $(".slot3").html(9);

    $(".slot4").html(0);
    $(".slot4").html(9);

    $(".slot5").html(0);
    $(".slot5").html(9);

    $(".slot6").html(0);
    $(".slot6").html(9);
}

// 「SPIN!」が押されたとき
$("#spin").on('click',function(){

    // 結果を一旦消す
    $("#content").html("");
    $("#result").html("");

    // スロットを1700秒ごとに一回転させ始める
    roller = setInterval(roll, 1700);

    // 最初の一回は即実行
    roll();
});

// 「STOP!」が押されたとき
$("#stop1").on('click',function(){

    // スロットの回転を止める
    clearInterval(roller);

    // スロットにランダムな数字を表示する
    $(".slot1").html(Math.floor(Math.random()*5));
    $(".slot2").html(Math.floor(Math.random()*10));
    $(".slot3").html(Math.floor(Math.random()*10));
    $(".slot4").html(Math.floor(Math.random()*10));
    $(".slot5").html(Math.floor(Math.random()*10));
    $(".slot6").html(Math.floor(Math.random()*10));

    // 作品を読み込む
    loadArt();
});

// 作品を読み込む
async function loadArt() {

    // スロットの状態を元にobjectIdを決める
    // odometerを使う場合はその値はodometer-valueで取得する。
    const objectId =
      $(".slot1 .odometer-value").html() +
      $(".slot2 .odometer-value").html() +
      $(".slot3 .odometer-value").html() +
      $(".slot4 .odometer-value").html() +
      $(".slot5 .odometer-value").html() +
      $(".slot6 .odometer-value").html();

    // objectId にマッチする作品を The Met Collection API から取得する
    const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
    console.log({res});
    if(res.ok === false) {
      $("#content").html("はずれ（作品が存在しません）");
      $("#result").html("");
      return;
    }

    const art = await res.json();
    console.log(art);

    //これでタイトルだけを取得し、表示させる
    $("#content").html(art.title);

    //ここで画像URLを取得
    const imageUrl = art.primaryImage;
    console.log(imageUrl);
    if(imageUrl === "") {
      $("#content").html("はずれ（作品画像が存在しません）");
      $("#result").html("");
      return;
    }

    //取得したURLを画像で表示
    $("#result").html('<img src = ' + imageUrl +'>')
};

// FIX: 「SPIN!」を連続で押すと「STOP!」しても止まらない
// FIX: 「SPIN!」を押さなくても「STOP!」すれば作品が読み込まれる
