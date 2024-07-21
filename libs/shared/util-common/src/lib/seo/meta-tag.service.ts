import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaTagService {
  private meta = inject(Meta);
  private title = inject(Title);

  updateMetaTags(
    title: string,
    description: string,
    image: string,
    url: string,
  ): void {
    this.title.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
  }

  // updateMetaTags(config: any): void {
  //   this.title.setTitle(config.title || 'Default Title');
  //   this.meta.updateTag({
  //     name: 'description',
  //     content: config.description || 'Default Description',
  //   });
  //   this.meta.updateTag({
  //     name: 'keywords',
  //     content: config.keywords || 'Default Keywords',
  //   });
  //   this.meta.updateTag({
  //     property: 'og:type',
  //     content: config.ogType || 'website',
  //   });
  //   this.meta.updateTag({
  //     property: 'og:title',
  //     content: config.ogTitle || config.title || 'Default OG Title',
  //   });
  //   this.meta.updateTag({
  //     property: 'og:description',
  //     content:
  //       config.ogDescription || config.description || 'Default OG Description',
  //   });
  //   this.meta.updateTag({
  //     property: 'og:image',
  //     content: config.ogImage || 'default-image.jpg',
  //   });
  //   this.meta.updateTag({
  //     property: 'og:url',
  //     content: config.ogUrl || window.location.href,
  //   });
  //   this.meta.updateTag({
  //     name: 'twitter:card',
  //     content: config.twitterCard || 'summary_large_image',
  //   });
  //   this.meta.updateTag({
  //     name: 'twitter:image',
  //     content: config.twitterImage || config.ogImage || 'default-image.jpg',
  //   });
  //   this.meta.updateTag({
  //     name: 'twitter:title',
  //     content: config.twitterTitle || config.title || 'Default Twitter Title',
  //   });
  //   this.meta.updateTag({
  //     name: 'twitter:description',
  //     content:
  //       config.twitterDescription ||
  //       config.description ||
  //       'Default Twitter Description',
  //   });
  //   this.meta.updateTag({
  //     name: 'linkedin:card',
  //     content: config.linkedinCard || 'summary_large_image',
  //   });
  //   this.meta.updateTag({
  //     name: 'linkedin:description',
  //     content:
  //       config.linkedinDescription ||
  //       config.description ||
  //       'Default LinkedIn Description',
  //   });
  //   this.meta.updateTag({
  //     name: 'linkedin:image',
  //     content: config.linkedinImage || config.ogImage || 'default-image.jpg',
  //   });
  //   this.meta.updateTag({ name: 'pinterest-rich-pin', content: 'true' });
  //   this.meta.updateTag({
  //     name: 'p:domain_verify',
  //     content: config.pinterestDomainVerify || 'default-verification-code',
  //   });
  // }
}
