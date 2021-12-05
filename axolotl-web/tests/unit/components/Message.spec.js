import { expect } from 'chai'
import LinkifyHtml from 'linkifyjs/html'
import Message from '@/components/Message.vue'
import { mount } from '@vue/test-utils'
import vuex from "vuex";

const wrapperConfig = {
  global: {
    directives: {
      Translate() {
         // do nothing in this test
      }
    },
    mixins: [
      {
        methods: {
          linkify(content) {
            return LinkifyHtml(content);
          }
        }
      }
    ],

  }
}

describe('Message.vue', () => {
  it('renders simple message without changes', () => {
    const msg = {
        ID: 'test',
        Message: 'Test Message',
        Attachment: '',
        Outgoing: false,
        QuotedMessage: null,
        ExpireTimer: 0,
        ReceivedAt: 0,
    }
    const wrapper = mount(Message, {
      ...wrapperConfig,
      props: {
        message: msg,
        isGroup: false,
        names: [ ]
      }
    })
    expect(wrapper.get('[data-test="message-text"]').wrapperElement.innerHTML).to.equal(msg.Message)
  })

  it('renders message with link linkified', () => {
    const expected = 'Visit <a href="http://axolotl.chat">axolotl.chat</a> if you have time'
    const msg = {
        ID: 'test',
        Message: 'Visit axolotl.chat if you have time',
        Attachment: '',
        Outgoing: false,
        QuotedMessage: null,
        ExpireTimer: 0
    }
    const wrapper = mount(Message, {
      ...wrapperConfig,
      props: {
        message: msg,
        isGroup: false,
        names: [ ]
      }
    })
    expect(wrapper.get('[data-test="message-text"]').wrapperElement.innerHTML).to.equal(expected)
  })

  it('renders message with html entities escaped', () => {
    const expected = 'I &lt;3 Axolotl'
    const msg = {
        ID: 'test',
        Message: 'I <3 Axolotl',
        Attachment: '',
        Outgoing: false,
        QuotedMessage: null,
        ExpireTimer: 0
    }
    const wrapper = mount(Message, {
      ...wrapperConfig,
      props: {
        message: msg,
        isGroup: false,
        names: [ ]
      }
    })
    expect(wrapper.get('[data-test="message-text"]').wrapperElement.innerHTML).to.equal(expected)
  })
})
