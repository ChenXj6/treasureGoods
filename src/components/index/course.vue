<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.Homepage.home16')"
                   left-text
                   left-arrow
                   @click-left="$router.go(-1)" />
    </div>
    <div class="videoListBox">
      <ul class="videoList">
        <li v-for="(item,i) in videoList"
            :key="i"
            style="margin-bottom: 30px">
          <div id="video-title">
            {{item.video_title}}
          </div>
          <video
            :id="'myVideo'+item.id"
            class="video-js vjs-default-skin vjs-big-play-centered"
            style="width:100%;"
          >
        <source
            :src="item.video_url"
            type="video/mp4"
        >
        </video>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
      videoList: [],
      page: 1,
      playlist:[]
    }
  },
  mounted(){
    this.videos();
  },
  methods: {
    videos () {
      this.$api.Post('videos', { page: this.page}).then(res => {
        if (res.status == 1) {
          this.videoList = res.result.videos;
          this.initVideo()
        }
      })
    },
    initVideo () {
      this.$nextTick(()=>{
        this.videoList.map((item,i)=>{
          let w = document.getElementById('video-title').offsetWidth;
          let noAutoPlay = false
          if(item.id == this.videoList.length){
            noAutoPlay = 'muted'
          }
          let myPlayer = this.$video('myVideo'+item.id, {
            //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
            controls: true,
            //自动播放属性,muted:静音播放
            autoplay: noAutoPlay,
            //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
            preload: "auto",
            //设置视频播放器的显示宽度（以像素为单位）
            width: w || '380px',
            //设置视频播放器的显示高度（以像素为单位）
            height: "200px",
          });
          this.playlist.push(myPlayer)
        })
      })
    },
  },
   beforeDestroy(){ //（第三步）在销毁之前拿到video实例
    for(let i=0;i<this.playlist.length;i++){
     this.playlist[i].dispose(); //（第四步）dispose()是官方的销毁函数
    }
  },
}
</script>


<style lang="less">
.videoListBox {
  width: 100%;
  height: 100%;
  padding: 0 2%;
  box-sizing: border-box;
  > .videoList {
    width: 100%;
    padding: 2%;
    box-sizing: border-box;
    > li {
      // height: 200px;
      height: auto;
      margin: 10px 0;
      box-sizing: border-box;
      > #video-title {
        line-height: 1.6;
        padding:0 0.3rem;
        background: #1e243d;
      }
    }
  }
}
</style>