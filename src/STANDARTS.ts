export type FetchTypes = `login` | `check_cookie` | `signup`

export const url = 'https://animepear.pythonanywhere.com/'


export type CookieNames = `user_token` | `login`


export enum Colors {
    white = `#ffffff`,
    gray = `#282424`,
    magenta = `#ff007b`,
    transparent_magenta = `#ff007b40`,
    gray_bg = `linear-gradient(40deg, #00000040, #44444466)`,

    t_size_big = `5dvh`,
    t_size_normal = `2.5dvh`,
    t_size_mini = `1.7dvh`,
    t_shadow_norm_gray = `4px 1px 4px ${Colors.gray}`,
    t_shadow_light_magenta = `4px 1px 4px ${Colors.magenta}`,
    t_shadow_light_white = `4px 1px 4px ${Colors.white}`,
    bg_shadow = `1px 1px 6px #00000039`,

    height_standart_step = `6dvh`,
    width_standart_step = `5dvw`,


    colorTextPlaceholder = `#838383`
}


//changed in ImgCropProps children --> cheldren? in C:\WORK_FILES\animepear\node_modules\antd-img-crop\dist\antd-img-crop.d.ts

