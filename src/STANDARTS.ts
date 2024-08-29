export type FetchTypes = `skip_auth` /* має задати куку user_token=skipped_registration */ | `login` /* має задати куку */ | `check_cookie`



export type CookieNames = `user_token`


export enum Colors {
    white = `#ffffff`,
    gray = `#202124`,
    magenta = `#ff007b`,
    transparent_magenta = `#ff007b40`,

    t_size_big = `5dvh`,
    t_size_normal = `2.5dvh`,
    t_size_mini = `1.7dvh`,
    t_shadow_norm_gray = `4px 1px 4px ${Colors.gray}`,
    t_shadow_light_magenta = `4px 1px 4px ${Colors.magenta}`,
    t_shadow_light_white = `4px 1px 4px ${Colors.white}`,

    height_standart_step = `6dvh`,
    width_standart_step = `5dvw`,


    colorTextPlaceholder = `#838383`
}