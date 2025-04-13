// 异常检测工具类
class AnomalyDetector {
    constructor(windowSize = 10) {
      this.window = [];
      this.windowSize = windowSize;
    }
  
    // 基于Z-Score的检测
    zScoreDetection(current, threshold = 3) {
      if (this.window.length < 5) return false;
      
      const mean = this.window.reduce((a, b) => a + b) / this.window.length;
      const std = Math.sqrt(
        this.window.map(x => Math.pow(x - mean, 2))
          .reduce((a, b) => a + b) / this.window.length
      );
      
      return Math.abs((current - mean) / std) > threshold;
    }
  
    // 基于移动平均的检测
    movingAverageDetection(current, threshold = 0.2) {
      const avg = this.window.length > 0 ? 
        this.window.reduce((a, b) => a + b) / this.window.length : 0;
      return Math.abs(current - avg) / avg > threshold;
    }
  
    // 更新滑动窗口
    updateWindow(value) {
      if (this.window.length >= this.windowSize) {
        this.window.shift();
      }
      this.window.push(value);
    }
  
    // 综合检测
    detect(value, method = 'zscore') {
      this.updateWindow(value);
      
      switch(method) {
        case 'zscore':
          return this.zScoreDetection(value);
        case 'moving_avg':
          return this.movingAverageDetection(value);
        default:
          return false;
      }
    }
  }
export default AnomalyDetector