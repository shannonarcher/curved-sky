import {shallowMount} from '@vue/test-utils';
import BlogExcerpt from '@/components/BlogExcerpt';
import VueRouter from 'vue-router';

function createComponent({ post } = {}) {
    const spies = {
        afterEach: jest.fn(),
    };

    const router = new VueRouter({
        afterEach: spies.afterEach,
    });

    const localVue = createLocalVue();
    localVue.use(VueRouter);

    return {
        component: shallowMount(BlogExcerpt, {
            propsData: {
                post: {
                    id: 1,
                    title: 'A Blog Title',
                    tags: ['vue', 'vuex', 'vue-test-utils'],
                    excerpt: '# A Heading',
                    _created: 0,
                    ...post,
                },
            },
            stubs: {
                DateTags: {
                    template: '<div>A Tag</div>',
                },
            },
            router,
            localVue,
        }),
        spies,
    };
}

describe('BlogExcerpt', () => {
    xdescribe('when clicking the blog excerpt', () => {
        test('should go to the related post page', () => {
            const { component, spies: { afterEach } } = createComponent();
            component.find('.blog-excerpt').trigger('click');
            expect(afterEach).toHaveBeenCalledWith(jest.objectContaining({
                name: 'post',
            }));
        });
    });

    describe('when rendering the component', () => {
        test('the post title should dispaly', () => {});
        test('the post tags should display', () => {});
        test('the post excerpt should display', () => {});
    });
});