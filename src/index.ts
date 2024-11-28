type LogType = 'success' | 'error' | 'warning' | 'info' | 'debug'

interface BaseLogStyle {
  [key: string]: string | undefined  // 允许任意 CSS 属性
}

interface LogStyle extends BaseLogStyle {
  color?: string
  backgroundColor?: string
  padding?: string
  borderRadius?: string
  fontWeight?: string
  textDecoration?: string
}

interface RawLogStyle extends BaseLogStyle {
  _rawStyle: string
}

type CustomLogStyle = LogStyle | RawLogStyle

const logStyles: Record<LogType, LogStyle> = {
  success: {
    color: '#67C23A',
    backgroundColor: '#F0F9EB',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: 'bold'
  },
  error: {
    color: '#F56C6C',
    backgroundColor: '#FEF0F0',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: 'bold'
  },
  warning: {
    color: '#E6A23C',
    backgroundColor: '#FDF6EC',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: 'bold'
  },
  info: {
    color: '#909399',
    backgroundColor: '#F4F4F5',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: 'bold'
  },
  debug: {
    color: '#409EFF',
    backgroundColor: '#ECF5FF',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: 'bold'
  }
}

const generateStyle = (style: LogStyle): string => {
  // 处理原始 CSS 字符串
  if ('_rawStyle' in style) {
    return style._rawStyle as string
  }

  return Object.entries(style)
    .map(([key, value]) => `${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}:${value}`)
    .join(';')
}

export const log = {
  success(...messages: any[]) {
    const baseStyle = logStyles.success
    this._print(messages, baseStyle)
    return this
  },

  error(...messages: any[]) {
    const baseStyle = logStyles.error
    this._print(messages, baseStyle)
    return this
  },

  warning(...messages: any[]) {
    const baseStyle = logStyles.warning
    this._print(messages, baseStyle)
    return this
  },

  info(...messages: any[]) {
    const baseStyle = logStyles.info
    this._print(messages, baseStyle)
    return this
  },

  debug(...messages: any[]) {
    const baseStyle = logStyles.debug
    this._print(messages, baseStyle)
    return this
  },

  custom(style: CustomLogStyle | string, ...messages: any[]) {
    const baseStyle = typeof style === 'string'
      ? { _rawStyle: style } as RawLogStyle
      : style
    this._print(messages, baseStyle)
    return this
  },

  _print(messages: any[], baseStyle: CustomLogStyle) {
    let args: string[] = []
    let styles: string[] = []

    messages.forEach((msg, i) => {
      const [formattedMsg, additionalStyles] = this._formatMessage(msg, baseStyle)
      if (i > 0) args.push(' ')
      args.push(additionalStyles.length ? formattedMsg : `%c${formattedMsg}`)
      styles.push(...(additionalStyles.length ? additionalStyles : [generateStyle(baseStyle)]))
    })

    console.log(args.join(''), ...styles)
  },

  _formatMessage(msg: any, baseStyle: LogStyle): [string, string[]] {
    if (msg === null) return ['null', []]
    if (msg === undefined) return ['undefined', []]

    const type = typeof msg
    if (type === 'number') {
      const numberStyle = {
        ...baseStyle,
        textDecoration: 'underline'
      }
      return [`%c${msg}`, [generateStyle(numberStyle)]]
    }

    if (type === 'object') {
      const styles: string[] = []
      let formatted = JSON.stringify(msg, null, 2)

      formatted = formatted.replace(/\b(\d+)\b/g, (match) => {
        styles.push(
          generateStyle({ ...baseStyle, textDecoration: 'underline' }),
          generateStyle(baseStyle)
        )
        return `%c${match}%c`
      })

      return [formatted, styles]
    }

    return [String(msg), []]
  }
}