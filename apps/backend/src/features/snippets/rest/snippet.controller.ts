import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SnippetService } from '@snipcode/domain';
import { OEmbedResult, generateOembedMetadata } from '@snipcode/embed';

import { EnvironmentVariables } from '../../../configs/environment';

@Controller('snippets')
export class SnippetController {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
    private readonly snippetService: SnippetService,
  ) {}

  @Get(':id/oembed')
  async generateOembed(@Param('id') id: string): Promise<OEmbedResult> {
    const snippet = await this.snippetService.findById(id);

    return generateOembedMetadata({
      snippet: {
        id: snippet.id,
        name: snippet.name,
      },
      snippetRendererURL: this.configService.get('SNIPPET_RENDERER_API_URL'),
      webAppURL: this.configService.get('WEB_APP_URL'),
    });
  }
}
