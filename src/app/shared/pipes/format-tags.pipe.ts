import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTags'
})
export class FormatTagsPipe implements PipeTransform {
  transform(tags: string[]): string {
    if (!tags || tags.length === 0) {
      return '';
    }
    return tags
      .map(tag => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase())
      .join(', ');
  }
}
