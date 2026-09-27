import request from '@/utils/request'

export function getWeatherForecast() {
  return request({
    url: '/WeatherForecast',
    method: 'get'
  })
}